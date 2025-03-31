const backedendUrl = 'http://localhost:5000';
export const userEndPoint = {
    login: `${backedendUrl}/api/login`, // Login endpoint for user authentication
    register: `${backedendUrl}/api/register`, // Registration endpoint for new users
    verifyEmail: `${backedendUrl}/api/verify-email`, // Email verification endpoint
    forgotPassword: `${backedendUrl}/api/forgot-password`, // Password reset request endpoint
    resetPassword: `${backedendUrl}/api/reset-password`, // Password reset endpoint
    getUserDetails: `${backedendUrl}/api/user/details`, // Endpoint to fetch user details
    updateUserDetails: `${backedendUrl}/api/user/update`, // Endpoint to update user details
    deleteUserAccount: `${backedendUrl}/api/user/delete`, // Endpoint to delete user account
    getUserEmails: `${backedendUrl}/api/user/emails`, // Endpoint to fetch user's emails
    syncEmails: `${backedendUrl}/api/user/sync-emails`, // Endpoint to sync user's emails
}

export const emailEndPoint = {
    getEmails: `${backedendUrl}/api/getemails`, // Endpoint to fetch emails
    sendEmail: `${backedendUrl}/api/send-email`, // Endpoint to send emails
    deleteEmail: `${backedendUrl}/api/delete-email`, // Endpoint to delete emails
    markAsRead: `${backedendUrl}/api/mark-as-read`, // Endpoint to mark emails as read
    moveToFolder: `${backedendUrl}/api/move-to-folder`, // Endpoint to move emails to a folder
}
