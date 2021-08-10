1. Clone this repo.
2. After cloning this branch, please run *git checkout feat/backend_task* to hop on to the correct branch.
3. Once you've cloned this branch, you'll then have to install all the dependencies. You can run npm install to do that.
4. After all the dependencies are installed, you can run *node prompt.js*
5. After running prompt.js you'll be asked to type in the arg_type, you can either type "searchJoke" or "leaderboard" (without the quotes)
6. If you type searchJoke, you'll again be prompted to type the search_term. You'll get a joke in response if there is a joke pertaining to the entered search_term if not you'll get a message. If the response contains a joke, it'll be saved in the file named as ./jokes.txt
7. If you type leaderbord, you'll get the most frequest joke in ./jokes.txt
