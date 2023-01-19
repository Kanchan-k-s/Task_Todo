export default{
    computed:{
        filteredTasks: function () {
            if(this.search==''){
                return this.tasks
            }
        return this.tasks.filter((task) => {
            return task.description.match(this.search);
        })
    }
    }
}