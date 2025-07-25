const mongoose = require('mongoose')
const Note = require('./note');

(async () => {
    try{
        await mongoose.connect( process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log('✅ Connected to MongoDB');
        // Create a new note

        const newNote = new Note({
        title: 'AI for Creatives: Tools and Trends',
        author: 'Adarsh',
        coverImage: 'https://cdn.cloudinary.com/your-image.jpg',
        content: [
            { type: 'heading', value: 'Intro to Creative AI' },
            { type: 'paragraph', value: 'AI is changing art, music, and writing...' },
            { type: 'image', value: 'https://cdn.cloudinary.com/image2.jpg' }
        ],
        tags: ['AI', 'Creativity', 'Tools'],
        });

        const savedNote =await newNote.save();
        console.log('📄 Saved Note:', savedNote);

        const foundNote = await Note.findOne({slug:savedNote.slug});
        console.log('🔍 Found Note by slug:', foundNote);

        

    } catch(err){
        console.error('❌ Error:', err.message);
    }
}
)();