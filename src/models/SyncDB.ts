import sequelize from '../config/database'; 
import User from './User';  
import Post from './Post';
import Comment from './Comment';
import Category from './Category';

/* create the associations */

// User and Post models
User.hasMany(Post, { foreignKey: 'userID' });
Post.belongsTo(User, { foreignKey: 'userID' });

// User and Comment models
User.hasMany(Comment, { foreignKey: 'userID' });
Comment.belongsTo(User, { foreignKey: 'userID' });

// Post and Comment models
Post.hasMany(Comment, { foreignKey: 'postID' });
Comment.belongsTo(Post, { foreignKey: 'postID' });

// Post and Category models
Post.belongsToMany(Category, { through: 'PostCategory' });
Category.belongsToMany(Post, { through: 'PostCategory' });


// test the connection to the database
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
    
// sync the tables
const syncDB = async () => {
    try {
        await sequelize.sync({ force: false }); 
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error syncing tables:', error);
    }
};

//syncDB();  // Call the syncDB function to sync the tables
