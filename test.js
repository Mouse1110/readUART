exports.testSerial = function(data) {
    serialPort.list(function(err, ports) {

      var port = {};

      for(var i = 0; i < ports.length; i++) {
        try {
          if(typeof ports[i].manufacturer != 'undefined' && ports[i].manufacturer.includes("Numato")) {
            port = ports[i];
          }
        } catch(err) {
          console.dir(err);
        }
      }

      // the port will be opened via the constructor of this call
      var numato = new serial(port.comName, {baudrate : 19200}, function(err) {
        if(err) {
          return console.dir(err);
        }

        // by having the write call within the callback you can access it directly w/o using .on()
        numato.write('relay ' + data.state + ' ' + data.channel + '\r', function(err) {
          if(err) {
            console.dir('error writing');
            console.dir(err);
          }
          console.dir('serial message written');
          numato.close();
        });
      });

      return true;

    });
 }