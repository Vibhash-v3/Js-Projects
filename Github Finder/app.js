//init the git hub
const github = new Github
//init UI
const ui = new UI;

//selector
const searchUser = document.getElementById('searchUser');

//add event listner
searchUser.addEventListener('keyup', (e) => {
    const userText = e.target.value;

    if(userText !== ''){
        github.getUser(userText)
            .then(data =>{
                if(data.profile.message === 'Not Found'){
                    //show alert
                    ui.showAlert('USer Not found', 'alert alert-danger');
                } else {
                    //show profile
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos);
                }
            });
    } else {
        //clear profile
        ui.clearProfile();
    }
});