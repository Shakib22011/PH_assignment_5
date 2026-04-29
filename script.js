//load all issues
const loadallissues=()=>{
    // console.log('hello');
    const url='https://phi-lab-server.vercel.app/api/v1/lab/issues';
    fetch(url).then(res=>res.json()).then(json=>{
        displayallissues(json.data);
    })
}
loadallissues();

//display all issues on the dashboard
const displayallissues=(issues)=>{
    const issuecontainer=document.getElementById('issue-container');
    issuecontainer.innerHTML='';
    // console.log(issues);
    issues.forEach(issue=>{
        // console.log(issue);
        const card=document.createElement('div');
        card.innerHTML=`
        <div class="shadow-lg bg-white p-5 rounded-md space-y-3 border-top-green">
          <div class="flex items-center justify-between">
            <img src="./assets/Open-Status.png" alt="" />
            <button class="btn btn-soft btn-secondary rounded-full px-6 max-h-[24px]">HIGH</button>
          </div>
          <div class="space-y-4">
            <h2 class="text-lg font-semibold">Fix navigation menu on mobile devices</h2>
            <p class="text-neutral/70">
              The navigation menu doesn't collapse properly on mobile devices...
            </p>
            <div class="flex gap-2 items-center flex-wrap">
              <button class="btn btn-soft btn-secondary rounded-full px-6 max-h-[24px]">BUG</button>
              <button class="btn btn-soft btn-warning rounded-full px-6 max-h-[24px]">HELP WANTED</button>
            </div>
          </div>
          <div class="divider text-neutral/50"></div>
          <p class="text-neutral/50">#1 by john_doe</p>
          <p class="text-neutral/50">1/15/2024</p>
        </div>
        `;
        issuecontainer.appendChild(card);
    })

}