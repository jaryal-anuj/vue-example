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

let TaskForm = {
    data(){
        return {
            body:null
        }
    },
    template:`
        <form action="#" @submit.prevent="addTask">
            <input type="text" v-model.trim="body"/>
            <button>Add task</button>
        </form>
    `,
    methods:{
        addTask(){
            if(!this.body){
                return
            }

            bus.$emit('task:added',{id:Date.now(),body:this.body,done:false})

            this.body = null
        }
    }
}

let Tasks = {
    data(){
        return {
            tasks:[]
        }
    },
    components:{
        'task':Task,
        'task-form':TaskForm
    },
    template:`
        <div>
            <div class="tasks">
                <template v-if="tasks.length">
                    <task v-for="task in tasks" :key="task.id" :task="task"></task>
                </template>
                <span v-else>No tasks</span>
            </div>
            <task-form></task-form>
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

        bus.$on('task:added',(task)=>{
           console.log(task)
            this.tasks.unshift(task)
        })
    }
}


let app = new Vue({
    el:'#app',
    components:{
        'tasks':Tasks
    }
})