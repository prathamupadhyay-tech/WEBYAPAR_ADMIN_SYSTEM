export const autenticate = (req, res, next) => {
    const userRole = req.user.role; // Assuming the user role is stored in the JWT
    if (userRole === 'admin') {
      
      next();
    } else {
      
      return res.status(403).json({ message: 'Unauthorized' });
    }
  };