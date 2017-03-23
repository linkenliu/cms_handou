/**
 * Created by thinkpad on 2015/8/30.
 */
AV.initialize("ftyp976mykpgyk2ionwhnrym6lqp4yky2o6v8819fhwyvkar", "eyju6pj468pcqs9rs3bnhshat2x5rbk74lovz5jfay0ng9n5");

var IdolesUser = AV.Object.extend("IdolesUser");
var IdolesUserCount = AV.Object.extend("IdolesUserCount");
var IdolesUserComment = AV.Object.extend("IdolesUserComment");


var saveIdolesUser = function(obj){
    //alert("save");
    var idolesUser = new IdolesUser();
    idolesUser.save(obj, {
        success: function(object) {
            //alert("LeanCloud save! obj.id="+object.id);
        }
    });
};


var queryAllIdolesUser = function(callback){
    //alert("query all");
    var ret = new Array();

    AV.Query.doCloudQuery('select * from IdolesUser limit 1000', {
        success: function(result){
            //results 是查询返回的结果，AV.Object 列表
            var results = result.results;
            //do something with results...
            for (var i = 0; i < results.length; i++) {
                var record = results[i];

                var tmp = {
                    objectId:record.id,
                    userCode:record.get('userCode')
                };
                ret.push(tmp);

            }
            callback(ret);

        },
        error: function(error){
            //查询失败，查看 error
            alert(error.message);
        }
    });

};

var saveIdolesUserCount = function(obj){
    //alert("save");
    var idolesUserCount = new IdolesUserCount();

    AV.Query.doCloudQuery('select * from IdolesUserCount', {
        success: function(result){
            //results 是查询返回的结果，AV.Object 列表
            var results = result.results;
            //do something with results...
            if (results.length>0) {
                var record = results[0];

                // var ret = {
                //     objectId:record.id,
                //     userTotal:record.get('userTotal')
                // };

                var query = new AV.Query(IdolesUserCount);
                query.get(record.id,{
                    success: function(usercount) {
                      usercount.set('userTotal', obj.userTotal);
                      usercount.save();
                    },
                    error: function(object, error) {
                      // 失败了.
                      console.log(object);
                    }
                });

            }else{
                idolesUserCount.save(obj, {
                    success: function(object) {
                        //alert("LeanCloud save! obj.id="+object.id);
                    }
    });
            }
            

        },
        error: function(error){
            //查询失败，查看 error
            alert(error.message);
        }
    });



    
};


var queryAllIdolesUserCount = function(callback){
    //alert("query all");

    AV.Query.doCloudQuery('select userTotal from IdolesUserCount', {
        success: function(result){
            //results 是查询返回的结果，AV.Object 列表
            var results = result.results;
            //do something with results...
            if (results.length>0) {
                var record = results[0];

                var ret = {
                    objectId:record.id,
                    userTotal:record.get('userTotal')
                };

                callback(ret);

            }else{
                var ret = {
                    objectId:-1,
                    userTotal:0
                };

                callback(ret);
            }
            

        },
        error: function(error){
            //查询失败，查看 error
            alert(error.message);
        }
    });

};


var saveIdolesUserComment = function(obj){
    //alert("save");
    var idolesUserComment = new IdolesUserComment();
    idolesUserComment.save(obj, {
        success: function(object) {
            //alert("LeanCloud save! obj.id="+object.id);
        }
    });
};


var queryAllIdolesUserComment = function(callback){
    //alert("query all");
    var ret = new Array();

    AV.Query.doCloudQuery('select * from IdolesUserComment limit 1000', {
        success: function(result){
            //results 是查询返回的结果，AV.Object 列表
            var results = result.results;
            //do something with results...
            for (var i = 0; i < results.length; i++) {
                var record = results[i];

                var tmp = {
                    objectId:record.id,
                    comment:record.get('comment'),
                    resource_url:record.get('resource_url')
                };
                ret.push(tmp);

            }

            var showList = [];
            if(ret.length >= 5){
                // alert("ret.length >= 20");
                showList = ret.slice(ret.length-5);
            }else{
                // alert("ret.length < 20");
                showList = ret.slice(0);
            }



            callback(showList);

        },
        error: function(error){
            //查询失败，查看 error
            alert(error.message);
        }
    });

};

var randomIdoleCode = function(){
    var strsource=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var code = "";
    for(var i=0;i<8;i++){
        var n=Math.floor(Math.random()*strsource.length);
        code=code+strsource[n];
    }

    return code;
};
