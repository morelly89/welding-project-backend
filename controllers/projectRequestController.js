const { Resend } = require("resend");
const ProjectRequest = require("../models/ProjectRequest");

const resend = new Resend(process.env.RESEND_API_KEY);

const createProjectRequest = async (req, res) => {
  try {
    const { name, email, projectType, material, description } = req.body;

    if (!name || !email || !description) {
      return res.status(400).json({
        message: "Name, email, and description are required.",
      });
    }

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
    console.error("Project request error:", error);

    return res.status(500).json({
      message: "Unable to submit project request.",
    });
  }
};

const getProjectRequests = async (req, res) => {
  try {
    const projectRequests = await ProjectRequest.find({
      owner: req.user.userId,
    });

    return res.status(200).json(projectRequests);
  } catch (error) {
    console.error("Get project requests error:", error);

    return res.status(500).json({
      message: "Unable to retrieve project requests.",
    });
  }
};

const deleteProjectRequest = async (req, res) => {
  try {
    const projectRequest = await ProjectRequest.findById(
      req.params.requestId,
    ).select("+owner");

    if (!projectRequest) {
      return res.status(404).json({
        message: "Project request not found.",
      });
    }

    if (projectRequest.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You cannot delete this project request.",
      });
    }

    await projectRequest.deleteOne();

    return res.status(200).json({
      message: "Project request canceled successfully.",
    });
  } catch (error) {
    console.error("Delete project request error:", error);

    return res.status(500).json({
      message: "Unable to cancel project request.",
    });
  }
};
module.exports = {
  createProjectRequest,
  getProjectRequests,
  deleteProjectRequest,
};
