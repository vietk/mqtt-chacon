
# node-rpi-chacon

Mqtt client consumer application to send RF433 commands to a chacon device.

## How to use

The Mqtt client consumes message from two topics

* chacon/switch topic
* chacon/dimmer topic

The payload for the topics are the following :
payload = deviceId+command

Where

 * deviceId is the integer indentifier of the Chacon device
 * Command is the command value to transmit to the device, the command value is different regarding the topic chosen :
	 
	 *  For switch topic valid commands are ON or OFF
	 * For dimmer topic valid commands are ON, OFF or [0-100], the integer is the percentage value for dimming the switch

## Docker image 
Image name kviet/mqtt-rpi-chacon

The docker image expose the port 8080 in order to target the endpoint. 
The container should be started with enough priviliged to be able to use the GPIO of the RPI

* Example : 
sudo docker run --privileged --rm --name node-rpi-chacon- --net=host kviet/node-rpi-chacon
