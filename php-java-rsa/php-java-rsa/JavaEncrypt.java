import java.io.*;
import java.security.*;
import java.security.spec.*;
import javax.crypto.*;
import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

public class JavaEncrypt {
	
	private static final String PUBLIC_KEY="server_publickey";
	
	static String readFile(String path, Charset encoding) throws Exception, IOException {
		byte[] encoded = Files.readAllBytes(Paths.get(path));
		return new String(encoded, encoding);
	}
	
	public static PublicKey getPublicKey(String filename) throws Exception, IOException {
		String contents = readFile(filename, StandardCharsets.UTF_8);
		contents = contents.replace("-----BEGIN PUBLIC KEY-----", "");
		contents = contents.replace("-----END PUBLIC KEY-----", "");
		contents = contents.replace("\n", "");
		
		// Decode the base64 key
		byte[] keyBytes = DatatypeConverter.parseBase64Binary(contents);
		
		// Load the public key
		X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
		KeyFactory kf = KeyFactory.getInstance("RSA");
		PublicKey key = kf.generatePublic(spec);
		
		return key;
	}
	
	public static void main(String[] args) {
		try {
			final Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
			String plaintext;
			
			// Get the string from the arguments
			if(args.length>0 && args[0]!=null) {
				plaintext = args[0].toString();
			}
			else {
				plaintext = "{\"seed\":\"12345\",\"password\":\"abcde\"}";
			}
 
            // ENCRYPT using the PUBLIC key
            cipher.init(Cipher.ENCRYPT_MODE, getPublicKey(PUBLIC_KEY));
            byte[] encryptedBytes = cipher.doFinal(plaintext.getBytes());
			String ciphertext = DatatypeConverter.printBase64Binary(encryptedBytes);
			
			// Print the encrypted text
            System.out.println(ciphertext);
			
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
			System.err.println("An error occurred while reading the keys");
			e.printStackTrace();
		}
	}
}