
var exec = require('child_process').exec;

module.exports = {

    clear: function(){
        //do hexo clean
        
        var cmd = "hexo clean";
        this.executeCmd(cmd);
    },
    generate: function(){
        //do hexo generate
        var cmd = "hexo g";
        this.executeCmd(cmd);
    },
    startServer: function(){
        //do hexo s
        var cmd = "hexo s -o -p 4000";
        this.executeCmd(cmd);
    },
    deployTo: function(){
        //deploy to GitHub
        var cmd = "hexo d";
        this.executeCmd(cmd);
    },
    browserSync: function(){
        //For sync if sth modified in local view 
        //Todo
        // var cmd = "browser-sync start --proxy 'localhost:4001' '/public/**'";
        // this.executeCmd(cmd);
        //Todo ,暂时未解决实时自动刷新
        // var cmd = 'browser-sync start --proxy "http://localhost:4000/" --file "public/**"';
        var cmd = 'cd public && browser-sync start --server --files "**"';
        // var cmd = 'cd public && browser-sync start --proxy "http://localhost:4000/" --file "**"';
        this.executeCmd(cmd);
    },
    executeCmd: function(s){
        exec(s, function(err, stdout, stderr){
            if(err){
                console.log(err);
            }else{
                console.log(stdout);
                // return stdout;
            }
        });
    }
};