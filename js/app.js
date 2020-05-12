let Task = {
    props:['task'],
    template:`
        <div class="task">
            {{ task.body}}
        </div>
    `
}

let Tasks = {
    data(){
        return {
            tasks:[
               
            ]
        }
    },
    components:{
        'task':Task
    },
    template:`
        <div>
            <div class="tasks">
                <template v-if="tasks.length">
                    <task v-for="task in tasks" :key="task.id" :task="task"></task>
                </template>
                <span v-else>No tasks</span>
            </div>
            <form>
                Form
            </form>
        </div>
    `
}


let app = new Vue({
    el:'#app',
    components:{
        'tasks':Tasks
    }
})