Vue.component("to-do", {
    props: {
        tasks: {
            type: Array,
            required: true
        },
        remaining: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            new_task: null,
            new_date:null,
            new_name:null,

            error: null
        }
    },
    methods: {
        submitTask() {
            if (this.new_task && this.new_date && this.new_name) {
                this.$emit("add-task",{ name: this.new_name,
                    date: this.new_date,task:this.new_task });
                this.new_task = null;
                this.new_date=null;
                this.new_name=null;
                if (this.error) {
                    this.error = null;
                }
            } else {
                this.error = "The input field can't be empty!";
            }
        },
        removeTask(task) {
            this.$emit("remove-task", task);
        }
    },
    template: `

    <div class="container mt-2">
    <nav class="navbar navbar-light bg-light mb-3 font">
    <a class="navbar-brand" href="#">
    <i class="fas fa-bullhorn"></i>
        Vue Events Bulletin Board
    </a>
    </nav>
        
        <!-- ROW -->
        <div class="row text-left">
            <div class="col-sm">

                <!-- CARD BODY -->
                <div class="card border-dark mb-3 back" style="max-width: 18rem;">
                    <div class="card-header bg-transparent border-dark marg">Add an Event</div>
                    <div class="card-body text-dark">
                       <p>INPUT FIELDS</p>
                        <input type="text"
                        class="form-control"
                        placeholder="Event Name"
                        v-model="new_name"
                        >

                        <input  type="date"
                        class="form-control"
                        placeholder="Calendar"
                        v-model="new_date"
                        >

                        <input type="text"
                        class="form-control"
                        placeholder="Event discription"
                        v-model="new_task"
                        @keyup.enter="submitTask">
    
                    </div>
                    <div class="card-footer marg bg-transparent border-dark">

                    <p v-if="remaining === 0">To add a new EVENT, write something and press enter!</p>
                    <p><strong>Remaining Tasks: {{ remaining }}</strong></p>
                        
                    </div>
                    <!-- END OF FOOTER -->
                </div>
                <!-- END OF CARD -->

      
                <br>
            </div>


            <div class="col-sm">
                <!-- CARD BODY -->
                <div class="card border-dark mb-3 text-left" style="max-width: 18rem;" 
                                     v-for="(task, index) in tasks"
                                                :task="task"
                                                :key="index">
                    <div class="card-header border-dark text-capitalize">
                    <button type="button" class="close no-outline" @click="removeTask(task)">
                            <span>&times;</span>
                            </button>
                    
                            <i class="fas fa-bullhorn"></i> {{task.name}}
                            
            
                    </div>
                    <div class="card-body text-dark">
                        <h5 class="card-title font"><i class="fas fa-calendar-alt"></i> {{task.date}}</h5>
                        <p class="card-text font"> {{task.task}}</p>
                    </div>

                    <!-- END OF FOOTER -->
                </div>
                <!-- END OF CARD -->

            </div>
                        
        </div>
                <!-- row -->
            <p v-if="error">{{ error }}</p>

    </div>

    `
})

var app = new Vue({
    el: '#app',
    data: {
        tasks: []
    },
    computed: {
        taskCount() {
            return this.tasks.length;
        }
    },
    methods: {
        addNewTask(new_task) {
            this.tasks.push(new_task);
        },
        removeTask(task) {
            this.tasks.splice(this.tasks.indexOf(task), 1);
        }
    }
})