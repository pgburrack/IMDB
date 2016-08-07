'use strict';

module.exports = {

        JWT_SECRET : "1h3izO7b",

        DATE_ES_FORMAT : "YYYY-MM-DD HH:mm:ss",

        getKey : function(value){
          if(value == "default") return value;

          for(var key in this){
            if(this[key] == value){
              return key;
            }
          }
          return null;
        },

        ObjKeyByVal : function(AD_TYPE_INT, val) {
           return Object.keys(AD_TYPE_INT).filter(function(key) {return AD_TYPE_INT[key] === val})[0];
        },

        sortBy : function(obj, key) {
            obj.sort(function(a,b) {
                return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
            });
        },

        addedMenu : [
             {
                  title : "Admin",
                  icon : 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xNi41IDEyYzEuMzggMCAyLjQ5LTEuMTIgMi40OS0yLjVTMTcuODggNyAxNi41IDdDMTUuMTIgNyAxNCA4LjEyIDE0IDkuNXMxLjEyIDIuNSAyLjUgMi41ek05IDExYzEuNjYgMCAyLjk5LTEuMzQgMi45OS0zUzEwLjY2IDUgOSA1QzcuMzQgNSA2IDYuMzQgNiA4czEuMzQgMyAzIDN6bTcuNSAzYy0xLjgzIDAtNS41LjkyLTUuNSAyLjc1VjE5aDExdi0yLjI1YzAtMS44My0zLjY3LTIuNzUtNS41LTIuNzV6TTkgMTNjLTIuMzMgMC03IDEuMTctNyAzLjVWMTloN3YtMi4yNWMwLS44NS4zMy0yLjM0IDIuMzctMy40N0MxMC41IDEzLjEgOS42NiAxMyA5IDEzeiIvPgo8L3N2Zz4=',
                  refName : "admin",
                  component : "./../views/AdminView",
                  url: "/app/admin"
             }
        ]

}


