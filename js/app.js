let bus = new Vue()

let Task = {
    props:['task'],
    template:`
        <div class="task" :class="{ 'task--done':task.done }">
            {{ task.body}}
            <a href="#" @click.prevent="toggleDone(task.id)">Mark as {{ task.done ? 'not done': 'done' }} </a>
        </div>
    `,
    methods:{
        toggleDone(taskId){
            //this.task.done = !this.task.done
            bus.$emit('task:toggleDone',taskId)
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
            // this.tasks = this.tasks.map((task)=>{
            //     if(task.id === taskId){
            //         task.done = !task.done
            //     }
            //     return task
            // })

            let task = this.tasks.find((task)=>{
                return task.id === taskId
            })

            if(!task){
                return
            }

            task.done = !task.done
        }
    },
    mounted(){
        bus.$on('task:toggleDone',(taskId)=>{
            console.log(taskId)
            this.toggleDone(taskId)
        })
    }
}


let app = new Vue({
    el:'#app',
    components:{
        'tasks':Tasks
    }
})