import java.io.*;
import java.security.*;
import java.security.spec.*;
import javax.crypto.*;
import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

public class JavaDecrypt {
	
	private static final String PRIVATE_KEY="app_privatekey";
	
	static String readFile(String path, Charset encoding) throws Exception, IOException {
		byte[] encoded = Files.readAllBytes(Paths.get(path));
		return new String(encoded, encoding);
	}
	
	public static PrivateKey getPrivateKey(String filename) throws Exception, IOException {
		String contents = readFile(filename, StandardCharsets.UTF_8);
		contents = contents.replace("-----BEGIN PRIVATE KEY-----", "");
		contents = contents.replace("-----END PRIVATE KEY-----", "");
		contents = contents.replace("\n", "");
		
		// Decode the base64 key
		byte[] keyBytes = DatatypeConverter.parseBase64Binary(contents);
		
		// Load the private key
		PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
		KeyFactory kf = KeyFactory.getInstance("RSA");
		PrivateKey key = kf.generatePrivate(spec);
		
		return key;
	}
	
	public static void main(String[] args) {
		try {
			final Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
			String ciphertext;
			
			// Get the string from the arguments
			if(args.length>0 && args[0]!=null) {
				ciphertext = args[0].toString();
			}
			else {
				throw new Exception("Please give the encrypted string as a parameter");
			}
 
            // DECRYPT using the PRIVATE key
            cipher.init(Cipher.DECRYPT_MODE, getPrivateKey(PRIVATE_KEY));
			
            byte[] ciphertextBytes = DatatypeConverter.parseBase64Binary(ciphertext);
            byte[] decryptedBytes = cipher.doFinal(ciphertextBytes);
            String decryptedString = new String(decryptedBytes);
			
			// Print the decrypted text
            System.out.println(decryptedString);
			
		} 
		catch (NoSuchAlgorithmException e) {
			System.err.println("Algorithm not supported! " + e.getMessage() + "!");
		} 
		catch (NoSuchPaddingException | InvalidKeyException e) {
			System.err.println("Cipher cannot be created!");
			e.printStackTrace();
		} 
		catch (BadPaddingException | IllegalBlockSizeException e) {
			System.err.println("An error occurred during the encryption!");
			e.printStackTrace();
		}
		catch (IOException e) {
			System.err.println("An error occurred for IO");
			e.printStackTrace();
		}
		catch (Exception e) {
			System.err.println(e.getMessage());
			e.printStackTrace();
		}
	}
}