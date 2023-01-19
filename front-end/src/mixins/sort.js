export default{
    computed:{
        sortTasks: function () {
            
        return this.tasks.sort((a,b) => {
            if(a.priority<b.priority){
                return -1
            }
            if(a.priority>b.priority){
                return 1
            }
            return 0;
            
        })
    }
    }
}