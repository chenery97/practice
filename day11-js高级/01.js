onmessage = function (msg) {
  var num = 0;
  for (var i = 0; i < msg.data; i++) {
    num += Math.sqrt(i);
  }

  postMessage(num);

  close();
}