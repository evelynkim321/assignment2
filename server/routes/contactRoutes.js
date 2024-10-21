const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Import the Contact model

// POST route to add a new contact
router.post('/contacts', async (req, res) => {
   const { firstname, lastname, email } = req.body;
   try {
       const newContact = new Contact({ firstname, lastname, email });
       await newContact.save();
       res.status(201).send(newContact);
   } catch (error) {
       res.status(400).send(error);
   }
});

// GET route to get all contacts
router.get('/contacts', async (req, res) => {
   try {
       const contacts = await Contact.find();
       res.status(200).send(contacts);
   } catch (error) {
       res.status(500).send(error);
   }
});

// GET route to get a contact by ID
router.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).send('Contact not found');
        }
        res.status(200).send(contact);
    } catch (error) {
        res.status(500).send(error);
    }
 });

// PUT route to update a contact by ID
router.put('/contacts/:id', async (req, res) => {
   const { firstname, lastname, email } = req.body;
   try {
       const contact = await Contact.findByIdAndUpdate(req.params.id, { firstname, lastname, email }, { new: true });
       if (!contact) {
           return res.status(404).send('Contact not found');
       }
       res.status(200).send(contact);
   } catch (error) {
       res.status(400).send(error);
   }
});

// DELETE route to remove a contact by ID
router.delete('/contacts/:id', async (req, res) => {
   try {
       const contact = await Contact.findByIdAndDelete(req.params.id);
       if (!contact) {
           return res.status(404).send('Contact not found');
       }
       res.status(200).send('Contact deleted successfully');
   } catch (error) {
       res.status(500).send(error);
   }
});

// DELETE route to remove all contacts
router.delete('/contacts', async (req, res) => {
   try {
       await Contact.deleteMany({});
       res.status(200).send('All contacts deleted successfully');
   } catch (error) {
       res.status(500).send(error);
   }
});

module.exports = router;
