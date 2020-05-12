let bus = new Vue()

let Task = {
    props:['task'],
    template:`
        <div class="task" :class="{ 'task--done':task.done }">
            {{ task.body}}
            <a href="#" @click.prevent="toggleDone(task.id)">Mark as {{ task.done ? 'not done': 'done' }} </a>
            <a href="#" @click.prevent="deleteTask(task.id)">Delete </a>
        </div>
    `,
    methods:{
        toggleDone(taskId){
     
            bus.$emit('task:toggleDone',taskId)
        },
        deleteTask(taskId){
     
            bus.$emit('task:deleted',taskId)
        }
    }
}

let Tasks = {
    data(){
        return {
            tasks:[
               {id:1,body:'Task one', done:true},
               {id:2,body:'Task two', done:true}
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
    `,

    methods:{
        toggleDone(taskId){

            let task = this.tasks.find((task)=>{
                return task.id === taskId
            })

            task.done = !task.done
        },

        deleteTask(taskId){
            this.tasks = this.tasks.filter((task)=>{
                return task.id !== taskId
            })
        }

    },
    mounted(){
        bus.$on('task:toggleDone',(taskId)=>{
           
            this.toggleDone(taskId)
        })

        bus.$on('task:deleted',(taskId)=>{
           
            this.deleteTask(taskId)
        })
    }
}


let app = new Vue({
    el:'#app',
    components:{
        'tasks':Tasks
    }
})