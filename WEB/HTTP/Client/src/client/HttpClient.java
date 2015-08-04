package client;

import java.io.*;
import java.net.Socket;
import java.net.UnknownHostException;

public class HttpClient {

	private Socket socket;

	public HttpClient(String host, int port) throws UnknownHostException, IOException {
		socket = new Socket(host, port);
	}

	public File processRequest(String requestMessage, String host, String fileName) throws IOException {

		RequestProcessor requestProcessor = RequestProcessor.getInstance();
		ResponseProcessor responseProcessor = ResponseProcessor.getInstance();
		requestProcessor.sendRequestMessage(socket.getOutputStream(), requestMessage, host);
		File file = responseProcessor.processResponse(socket.getInputStream(), fileName);
		socket.close();
		return file;
	}

}
