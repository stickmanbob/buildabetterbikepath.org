var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/stickmanbob/buildabetterbikepath.org.git', 
        user: {
            name: 'Ajay', 
            email: 'ajayrajamani@gmail.com' 
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)