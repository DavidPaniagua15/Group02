const hasPermissions = (req, res, next) => {
    if (!req.session.user_id) {
       res
        .status(400)
        .json({ message: 'You do not have access to this task list, please return to login page.'});
        return;
    } else {
        next();
    }

}


module.exports = { hasPermissions };


       





//PSEUDO
// check if user ID is the correct one for access to the task list
// if no, return 401
// if yes, access to task and hook back to the handlebar