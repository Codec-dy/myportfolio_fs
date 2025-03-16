const getModel=(cat,database)=>{
    switch (cat) {
        case 'experience':
            return database.experienceModel();
        case 'project':
            return database.projectModel();
        case 'skills':
            return database.skillModel();
        case 'certificates':
            return database.certificateModel();
        case 'design':
            return database.graphicDesignModel();
        default:
            break;
    }
}

module.exports = getModel