package com.protostar.prostudy.until;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreInputStream;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.service.UserService;

/**
 * Servlet implementation class StudentCSVUpload
 */
public class StudentCSVUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	public StudentCSVUpload() {
		super();
		// TODO Auto-generated constructor stub
	}

	private BlobstoreService blobstoreService = BlobstoreServiceFactory
			.getBlobstoreService();

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("###Came to dopost  Uplode CSV Sheet");
		this.doGet(request, response);
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Long instituteID = null; 
		System.out.println("###Came to Uplode Excel Sheet");
		Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
		List<BlobKey> blobKeys = blobs.get("myFile");

		System.out.println("blobKeys:" + blobKeys);
		blobKeys.get(0).getKeyString();
		String[] split2 = null;
		try {
			ServletFileUpload upload = new ServletFileUpload();
			// res.setContentType("text/plain");

			FileItemIterator iterator = upload.getItemIterator(request);
			while (iterator.hasNext()) {

				FileItemStream item = iterator.next();
				// InputStream stream = item.openStream();
				BlobstoreInputStream stream = new BlobstoreInputStream(
						new BlobKey(blobKeys.get(0).getKeyString()));
				if (item.isFormField()) {
					System.out.println("Got a form field: "
							+ item.getFieldName());
					instituteID=Long.parseLong(request.getParameter(item.getFieldName()));
							
				} else {

					int len;
					byte[] fileContent = new byte[2000000]; // Can handle files
															// upto 20 MB

					int read = stream.read(fileContent);
					// System.out.println("No of bytes read:" + read);
					while ((len = stream.read(fileContent, 0,
							fileContent.length)) != -1) {
						// res.getOutputStream().write(fileContent, 0, len);
					}
					System.out.println("File content is : "
							+ new String(fileContent));
					System.out.println("File Read is Done!!");
					// Write code here to parse sheet of patients and upload to
					// database

					String fileAsString = new String(fileContent);
					// System.out.println("fileContent:" + fileAsString);
					// List<PatientInfo> patientInfoList = new
					// ArrayList<PatientInfo>();

					split2 = fileAsString.split("\n");
					// Start with 1 not 0, zero holds column headings

					

				}

			}
			
			try {
				//get business entity
				 UserService us = new UserService();
				 UserEntity getinstituteID = (UserEntity) us.getUserByInstitute(instituteID);

				for (int row = 1; row < split2.length; row++) {

					String[] split = split2[row].split(",");
					if (split == null || split.length < 6) {
						continue;
					}
					System.out.println(" Row: " + row);
					System.out.println(" Col1: " + split[0]);
					System.out.println(" Col2: " + split[1]);
					System.out.println(" Col3: " + split[2]);
					System.out.println(" Col4: " + split[3]);
					System.out.println(" Col5: " + split[4]);
					System.out.println(" Col3: " + split[5]);
					System.out.println(" Col4: " + split[6]);
					System.out.println(" Col5: " + split[7]);
					
					//create user 
				
					UserEntity ue=new UserEntity();
			//		ue.setInstituteID(instituteID);
					ue.setFirstName(split[0]);
					ue.setLastName(split[1]);
					ue.setAddress(split[2]);
					ue.setContact(split[3]);
					if(split[3].contains("0"))
					{ue.setIsGoogleUser(false);}
					else{ue.setIsGoogleUser(true);}
					ue.setEmail_id(split[5]);
					ue.setPassword(split[6]);
					ue.setSchoolName(split[7]);
				//	ue.setAuthority(Arrays.asList("employee"));
					us.addUser(ue);
					Thread.sleep(2000);
				}

				response.sendRedirect("http://localhost:8888/#/student/list");  
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} catch (Exception e) {
			response.getOutputStream().print(
					"File Uploading Failed!" + e.getMessage());
		}
	}
}
