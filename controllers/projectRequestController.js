const { Resend } = require("resend");
const ProjectRequest = require("../models/ProjectRequest");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const resend = new Resend(process.env.RESEND_API_KEY);

const createProjectRequest = async (req, res, next) => {
  try {
    const { name, email, projectType, material, description } = req.body;

    const projectRequest = await ProjectRequest.create({
      name,
      email,
      projectType,
      material,
      description,
      owner: req.user.userId,
    });

    await resend.emails.send({
      from: "Morelly Welding <onboarding@resend.dev>",
      to: process.env.REQUEST_EMAIL,
      replyTo: email,
      subject: `New Welding Project Request from ${name}`,
      html: `
        <h2>New Welding Project Request</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType || "Not provided"}</p>
        <p><strong>Material:</strong> ${material || "Not provided"}</p>

        <h3>Description</h3>
        <p>${description}</p>
      `,
    });

    return res.status(201).json({
      message: "Project request saved and sent successfully.",
      projectRequest,
    });
  } catch (error) {
    return next(error);
  }
};

const getProjectRequests = async (req, res, next) => {
  try {
    const projectRequests = await ProjectRequest.find({
      owner: req.user.userId,
    });

    return res.status(200).json(projectRequests);
  } catch (error) {
    return next(error);
  }
};

const deleteProjectRequest = async (req, res, next) => {
  try {
    const projectRequest = await ProjectRequest.findById(
      req.params.requestId,
    ).select("+owner");

    if (!projectRequest) {
      return next(new NotFoundError("Project not found."));
    }

    if (projectRequest.owner.toString() !== req.user.userId) {
      return next(
        new ForbiddenError("You cannot delete this project request."),
      );
    }

    await projectRequest.deleteOne();

    return res.status(200).json({
      message: "Project request canceled successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProjectRequest,
  getProjectRequests,
  deleteProjectRequest,
};
