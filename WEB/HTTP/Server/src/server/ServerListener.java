package server;

import java.net.ServerSocket;
import java.net.Socket;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.IOException;

public class ServerListener {

	private static ServerSocket serverSocket;
	private static Socket clientSocket;
	private static BufferedReader bufferedReader;
	private static String inputLine;
	private static BufferedOutputStream writer;

	public static void main(String[] args) {
		try {
			serverSocket = new ServerSocket(63400);
			while (true) {
				clientSocket = serverSocket.accept();
				writer = new BufferedOutputStream(clientSocket.getOutputStream());
				bufferedReader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
				processRequest();

				writer.close();
				bufferedReader.close();
				clientSocket.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void processRequest() throws IOException {
		while (!((inputLine = bufferedReader.readLine()).isEmpty())) {
			if (inputLine.startsWith("GET")) {
				processGet(inputLine);
			}
			if (inputLine.startsWith("POST") || inputLine.startsWith("PUT") || inputLine.startsWith("DELETE")) {
				methodNotSupported();
			}
		}
	}

	private static void methodNotSupported() throws IOException {
		writer.write("HTTP/1.1 200 OK\r\n".getBytes());
		writer.write("Content-Type: text/html\r\n".getBytes());
		writer.write("\r\n".getBytes());
		writer.write(("<HTML>" + "<HEAD><TITLE>501 Not Implemented</TITLE></HEAD>" + "<BODY>501 Not Implemented"
				+ "</BODY></HTML>\r\n").getBytes());
	}

	public static void processGet(String getRequest) throws IOException {
		String[] parts = getRequest.split("\\s+");
		String filename = parts[1].substring(1);

		if (filename.equals("")) {

			writer.write("HTTP/1.1 200 OK\r\n".getBytes());
			writer.write("Content-Type: text/html\r\n".getBytes());
			writer.write("\r\n".getBytes());
			writer.write("<h1>Funciona<h1\r\n>".getBytes());

		} else {
			sendResponse(filename);
		}
	}

	public static void sendResponse(String filename) throws IOException {
		try {
			File resource = new File(filename);
			FileInputStream fileInput = null;
			boolean fileExist = true;
			try {
				fileInput = new FileInputStream(resource);
			} catch (Exception ex) {
				fileExist = false;
			}

			String serverLine = "Simple HTTP Server\r\n";
			String statusLine = null;
			String contentTypeLine = null;
			String contentLengthLine = null;
			String contentBody = null;

			if (fileExist) {
				statusLine = "HTTP/1.0 200 OK\r\n";
				contentTypeLine = getResourceContentType(resource);
				contentLengthLine = "Content-Length: " + (new Integer(fileInput.available()).toString()) + "\r\n";
			} else {
				statusLine = "HTTP/1.0 200 OK\r\n";
				contentTypeLine = "Content-type: text/html\r\n";
				contentBody = "<HTML>" + "<HEAD><TITLE>404 Not Found</TITLE></HEAD>" + "<BODY>404 Not Found"
						+ "</BODY></HTML>\r\n";
				contentLengthLine = (new Integer(contentBody.length()).toString()) + "\r\n";
			}

			writer.write(statusLine.getBytes());
			writer.write(serverLine.getBytes());
			writer.write(contentTypeLine.getBytes());
			writer.write(contentLengthLine.getBytes());
			writer.write("\r\n".getBytes());

			if (fileExist) {

				writeResource(fileInput);
				fileInput.close();
			} else {
				writer.write(contentBody.getBytes());
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	private static void writeResource(FileInputStream fileInput) throws IOException {
		byte[] buffer = new byte[1024];
		int bytes = 0;
		while ((bytes = fileInput.read(buffer)) != -1) {
			writer.write(buffer, 0, bytes);
		}

	}

	private static String getResourceContentType(File resource) {
		if (resource.getName().endsWith(".jpeg")) {
			return "Content-type: image/jpeg\r\n";
		} else {
			return "Content-type: text/html\r\n";
		}
	}

}
