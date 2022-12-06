import { projectData } from "./project-data";
import { rederProject } from "./render-project";
import { assignEvents } from "./assign-events";
import { bookmark } from "./bookmark";

rederProject(projectData);
bookmark()
assignEvents()