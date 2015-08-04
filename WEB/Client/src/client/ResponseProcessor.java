package client;

import java.io.*;

public class ResponseProcessor {

	private static ResponseProcessor instance = null;

	protected ResponseProcessor() {

	}

	public static ResponseProcessor getInstance() {
		if (instance == null) {
			instance = new ResponseProcessor();
		}
		return instance;

	}

	public File processResponse(InputStream input, String fileName) throws IOException {

		byte[] buffer = new byte[1024];
		File file = new File("descarga/" + fileName);
		BufferedOutputStream bOutput = new BufferedOutputStream(new FileOutputStream(file));

		int tReaded = 0;
		int tArchivo = 0;
		int tReadedi = 0;
		int tPatterns = 0;
		int tWaitedChar = '\n';
		boolean inContent = false;

		while ((tReadedi = input.read(buffer)) > 0) {

			if (inContent) {
				bOutput.write(buffer, 0, tReadedi);
				tArchivo += tReadedi;
			} else {

				for (int i = 0; i < tReadedi; i++) {
					int chari = buffer[i];

					if (chari == tWaitedChar) {
						if (chari == '\r') {
							tWaitedChar = '\n';
						} else if (chari == '\n') {
							tPatterns++;
							tWaitedChar = '\r';
						}
						inContent = tPatterns == 2;

						if (inContent) {
							bOutput.write(buffer, i + 1, tReadedi - (i + 1));
							tArchivo += tReadedi - (i + 1);
							break;
						}
					} else {
						tPatterns = 0;
						tWaitedChar = '\r';
					}
				}
			}
			tReaded += tReadedi;
			buffer = new byte[1024];
		}
		bOutput.close();
		return file;
	}

}
