
const Team = require('../models/team')

const Project = require('../models/project')

const Task = require('../models/task')

//create a project, team ID in a body of a request
const createProject = async (req,res)=>{

    const {projectName, team} = req.body;

    if (!team){
        return res.status(400).send({message:'No team ID was sent'})
    }
    
    let newProject = new Project({
        projectName,
        team
    })

    Project.create(newProject, (err, createdProject)=>{
        if (err){
            return res.status(400).send(err);
        }

        Team.findOneAndUpdate( 
            {_id:team},
            {$push:{projects:createdProject._id}},
            (err)=>{
                if (err){
                    return res.status(400).send({message:'Something wrong with updating a team'})
                }
            }
        )
        res.send(createdProject);
    })

}

//get all project related to the team
//team id in parameters
const getTeamProjects = async(req,res)=>{
    const {teamId} = req.params;

    Project.find({team:teamId}, (err, projects)=>{
        if(err){
            return res.status(400).send(err);
        }
        res.status(200).send(projects);
    })

}

//get all project 
const getAllProjects = async(req,res)=>{
    Project.find((err,result)=>{
        if (err){
            res.status(400).send(err);
        }

        res.status(200).send(result);
    })
}

//seems like working (maybe not always)
//deletes project and project reference in related team
//deletes all tasks related to this project
const deleteProject = async(req,res)=>{

    const {projectId} = req.params;


    Project.findOneAndRemove({_id:projectId}, (err, project)=>{
        if (err){
            return res.status(400).send(err);
        }

        Team.findOneAndUpdate(
            {_id:project.team},
            {$pull:{projects: projectId}},
            {new:true},
            (err)=>{
                if (err){
                    return res.status(400).send({err,message:'team was not updated'});
                }
            }
        )

        Task.deleteMany({project: projectId}, (err)=>{
            if (err){
                return res.status(400).send({err, message:'could delete tasks related to a project'})
            }
        })

        res.status(200).send(project);
    })
}


const getProject = async(req,res)=>{
    const {projectId}=req.params;

    Project.findById({_id:projectId}, (err,project)=>{
        if (err){
            res.status(400).send(err);
        }

        res.status(200).send(project);
    })
}


const handleRealTimeProjects = (socket)=>{
    socket.on('joinProjectsPage', ({teamId})=>{
        // console.log('joined projects page with id ' + teamId)
        socket.join(teamId);
    })

    socket.on('addProject', (project)=>{
        socket.broadcast.to(project?.team).emit('project-added', project)
    })

    socket.on('deleteProject', ({projectId, teamId})=>{
        socket.broadcast.to(teamId).emit('project-deleted',{projectId})
    })

    socket.on('leaveProjectsPage', (teams)=>{
        // console.log('leaving ' + teams.map(team=>team._id))
        teams.forEach(team=>{
            socket.leave(team._id)
        })
    })
}

module.exports = {
    createProject,
    getTeamProjects,
    getAllProjects,
    deleteProject,
    getProject,
    handleRealTimeProjects
}