var login = require("facebook-chat-api");
 
var answeredThreads = {};
 
// Create simple echo bot
login({email: "01225566976", password: "Kinglove1@#"}, function callback (err, api) {
    if(err) return console.error(err);
 
     api.listen(function callback(err, message) {
        var d = new Date();
        var h = d.getHours();
        if(h >= 0 && h <= 24 && !answeredThreads.hasOwnProperty(message.threadID)){
            api.getUserInfo(message.senderID, function(err, ret) {
                if(err) return console.error(err);
                for(var prop in ret) {
                    if(ret.hasOwnProperty(prop) && ret[prop].name) {
                        api.sendMessage( "BOT : Chào bạn " + ret[prop].name + ", nếu bạn liên hệ để lấy code thì hiện tại mình không có online facebook. Bạn hãy gọi hoặc sms sdt 01225566976 để báo cho mình biết.", prop, function(){
                            answeredThreads[message.threadID] = true;
                        });
                    }
                }
            });
        }
    });
});