const Notification = require("../models/notification.model");
const Views = require("../models/test.model");

const DateManipulation = async (req, res) => {
  const { lease_start_date, rental_cycle } = req.body;
  if (rental_cycle.toLowerCase() === 'yearly') {
    let yearlyDate = new Date(lease_start_date); // Parse the input date  
    yearlyDate.setFullYear(yearlyDate?.getFullYear() + 1);
    res.status(201).send(yearlyDate)
  } else if (rental_cycle.toLowerCase() === 'monthly') {
    let monthlyDate = new Date(lease_start_date);
    monthlyDate.setMonth(lease_start_date.getMonth() + 1);
    res.status(201).send(monthlyDate)
  } else if (rental_cycle === 'daily') {
    let nextDay = new Date(lease_start_date);
    nextDay.setDate(lease_start_date?.getDate() + 1);
    res.status(201).send(monthlyDate)
  }
};

const createTest = async (req, res) => {
    const profileData = req.body;
    const { user_id } = req.decoded
    console.log('Profile updated:', profileData);
    // Here, you would handle the actual profile update logic, such as updating the database
    
    // Add notification
    const notification = new Notification({
      message: 'A profile update was done on this account',
      user_id // assuming user_id is included in the profileData
    });
  
    try {
      await notification.save();
      res.status(200).send('Profile updated and notification sent');
    } catch (error) {
      console.error('Error saving notification:', error);
      res.status(500).send('Internal Server Error');
    }
};

const notification = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).send('Internal Server Error');
  }
}

const getAllView = async (req, res) => {
  try {
      const views = await Views.find({})
      res.status(200).json(views)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const createViews = async (req, res) => {
  try {
    const views = await Views.create(req.body)
    res.status(200).json(views)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const views = async (req, res) => {
  const { id } = req.params
  const clientIp = req.clientIp;
  try {
    let views = await Views.findOne({unit_id: id}); 
    if (!views) {
       const newViews = await Views.create({unit_id: id})
       views = newViews
    }

    if (!views.visited_IPs.includes(clientIp)) {
      views.visits = (views.visits || 0) + 1;
      views.visited_IPs.push(clientIp);
      await views.save();
    }
    res.json({ message: 'Visit recorded', visits: views.visits });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports= {
    createTest,
    notification,
    DateManipulation,
    getAllView,
    views,
    createViews
}