const d = document;

export default function searchFilter() {
    const $input = d.querySelector('#searchInput'),
     $userList = d.querySelector("#users");

   let users = []

   async function loadUsers() {
       const response = await fetch('https://fakerapi.it/api/v1/users?_quantity=1000'),
       json = await response.json();
       renderUsers(json.data);
       users = json.data;
       renderUsers(users);
    }

    const $loading = d.createElement("img");
   $loading.setAttribute('src','/assets/grid.svg');
   $loading.setAttribute('alt','loading');
   $loading.setAttribute('style','margin: 0 auto');
   setTimeout(() => {
    $loading.setAttribute('class','none');
   },3000 );
   
   $userList.insertAdjacentElement("afterend", $loading)

    d.addEventListener('keyup', e => {
        if (e.target === $input ) {
           const newUsers = users.filter
           (user => `
           ${user.firstname.toLowerCase()} 
           ${user.lastname.toLowerCase()}`
           .includes($input.value.toLowerCase()))
           renderUsers(newUsers);
        }
    })

   loadUsers();

   const createUserItems = users => 
   users.map(user => `<li class="py-4 bg-gradient-to-r
    hover:from-pink-700 hover:to-purple-500 text-xl">
    ${user.firstname} ${user.lastname}</li>`).join('');

   function renderUsers(users) {
    const itemsString = createUserItems(users);
    $userList.innerHTML = itemsString;
    
   }
}