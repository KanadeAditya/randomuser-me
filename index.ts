import express from 'express'
import db from './models/index'
import { Op } from 'sequelize';

const app = express();

app.use(express.json())

app.get('/',async (req,res)=>{
    try {
        const { page, perPage, name, username, email, address, country, image, minAge, maxAge } = req.query;
        const currentPage = parseInt(page as string) || 1;
        const recordsPerPage = parseInt(perPage as string) || 10; // Default to 10 records per page
    
        const offset = (currentPage - 1) * recordsPerPage;
    
        // Construct the filter object based on provided query parameters
        const filter: any = {
          ...(name && { name }),
          ...(username && { username }),
          ...(email && { email }),
          ...(address && { address }),
          ...(country && { address: { [Op.like]: `%${country}%` } }),
          ...(image && { image }),
        };
    
        // Apply age-based filtering only if both minAge and maxAge are provided
        if (minAge && maxAge) {
          const currentDate = new Date();
          const maxBirthdate = new Date(currentDate.getFullYear() - parseInt(minAge as string), currentDate.getMonth(), currentDate.getDate());
          const minBirthdate = new Date(currentDate.getFullYear() - parseInt(maxAge as string) - 1, currentDate.getMonth(), currentDate.getDate());
    
          filter.birthday = {
            [Op.between]: [minBirthdate, maxBirthdate],
          };
        }
    
        // Find all records that match the filter criteria
        const { count, rows } = await db.User.findAndCountAll({
          where: filter,
          offset,
          limit: recordsPerPage,
        });
    
        const totalPages = Math.ceil(count / recordsPerPage);
    
        res.status(200).json({
          currentPage,
          totalPages,
          recordsPerPage,
          totalRecords: count,
          data: rows,
        });
      } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
})

app.post('/bulkcreate',async (req,res)=>{
    let data = req.body;
    try {
        await db.User.bulkCreate(data)
        res.status(201).send({msg:"Records Saved successfully"})
    } catch (error) {
        console.error('Error clearing table:', error);
        res.status(500).send({msg:"Internal Server Error"})
    }
})

app.delete('/bulkdelete', async (req, res) => {
    try {
      await db.User.destroy({ where: {}, truncate: true });
      res.status(200).json({ message: 'Table cleared successfully.' });
    } catch (error) {
      console.error('Error clearing table:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

db.sequelize.sync().then(()=>{
    app.listen(process.env.port,()=>{
        console.log(`server runnig on ${process.env.port}`)
    })
})

