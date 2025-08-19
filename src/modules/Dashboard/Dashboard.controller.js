import { dashboardService } from "./Dashboard.service.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const data = await dashboardService.getAdminDashboard();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCoordinadorDashboard = async (req, res) => {
  try {
    const data = await dashboardService.getCoordinadorDashboard();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getOperarioDashboard = async (req,res) =>{
  try {
    const {id} = req.params;
    const data = await dashboardService.getOperarioDashboard(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const getTecnicoDashboard = async (req,res) =>{
  try {
    const data = await dashboardService.getTecnicoDashboard();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}