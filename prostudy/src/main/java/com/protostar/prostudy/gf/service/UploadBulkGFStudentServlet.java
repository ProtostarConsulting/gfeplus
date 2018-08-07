package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Ref;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreInputStream;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.protostar.prostudy.entity.Address;
import com.protostar.prostudy.entity.InstituteEntity;
import com.protostar.prostudy.gf.entity.BookSummary;
import com.protostar.prostudy.gf.entity.ContactDetail;
import com.protostar.prostudy.gf.entity.ExamDetail;
import com.protostar.prostudy.gf.entity.GFStudentEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;
import com.protostar.prostudy.service.InstituteService;
import com.protostar.prostudy.until.data.UtilityService;

public class UploadBulkGFStudentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
    public UploadBulkGFStudentServlet() {
        super();
        // TODO Auto-generated constructor stub
    }    
    
    private BlobstoreService blobstoreService = BlobstoreServiceFactory
			.getBlobstoreService();

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("hi i m in GF Student servlet");
		this.doGet(request, response);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			if (request.getHeader("Content-Type") != null
					&& request.getHeader("Content-Type").startsWith(
							"multipart/form-data")) {
				ServletFileUpload upload = new ServletFileUpload();

				FileItemIterator iterator = upload.getItemIterator(request);
				String[] split2 = null;
				Map parameterMap = request.getParameterMap();
				for (Object key : parameterMap.keySet()) {
					System.out.println("key:" + key + "\b value:"
							+ parameterMap.get(key));
				}

				Long selectedSchoolID = 0L;
				while (iterator.hasNext()) {
					FileItemStream item = iterator.next();
					System.out.println("item.getFieldName(): "
							+ item.getFieldName());

					if (item.getName() == null) {
						// It is form field not file.

						if ("selectedSchoolID".equalsIgnoreCase(item.getFieldName())) {
							selectedSchoolID = Long.parseLong(UtilityService.read(item
									.openStream()));

						}
						continue;
					}
					InputStream openStream = item.openStream();
					int len = 0;
					byte[] fileContent = new byte[2000000];
					// Can handle files upto 20 MB

					int read = openStream.read(fileContent);
					// System.out.println("No of bytes read:" + read);
					while ((len = openStream.read(fileContent, 0,
							fileContent.length)) != -1) {
						// res.getOutputStream().write(fileContent, 0, len);
					}
					System.out.println("File content is : "
							+ new String(fileContent));
					System.out.println("File Read is Done!!");
					// Write code here to parse sheet of patients and upload to
					// database

					String fileAsString = new String(fileContent);

					split2 = fileAsString.split("\n");

				}

			 PartnerSchoolEntity partnerSchoolEntity2 = ofy().load().type(PartnerSchoolEntity.class).id(selectedSchoolID).now();
			 
			long instituteID = partnerSchoolEntity2.getInstituteID();
				
				for (int row = 1; row < split2.length; row++) {

					String[] split = split2[row].split(",");
					if (split == null || split.length < 5) {
						continue;
					}
					System.out.println(" Row: " + row);
					System.out.println(" fName: " + split[0]);
					System.out.println(" mName: " + split[1]);	
					System.out.println(" lName: " + split[2]);
					System.out.println(" gender: " + split[3]);
					System.out.println(" MediumOfAnswer: "+ split[4]);
					System.out.println(" standard: "+ split[5]);
							
					// insert partner school	
					String nextPRN = UtilityService.getNextPRN("Student");
					
					GFStudentEntity gfStudentEntity = new GFStudentEntity();
					
					gfStudentEntity.setfName(split[0]);
					gfStudentEntity.setmName(split[1]);
					gfStudentEntity.setlName(split[2]);
					gfStudentEntity.setGender(split[3]);
					gfStudentEntity.setMediumOfAnswer(split[4]);
					gfStudentEntity.setStandard(split[5]);;
					gfStudentEntity.setPrn(nextPRN);
					gfStudentEntity.setRole("Student");
					gfStudentEntity.setSchool(partnerSchoolEntity2);
					gfStudentEntity.setInstituteID(instituteID);
					
					ofy().save().entity(gfStudentEntity).now();
						
				}
			}}
			
		catch (Exception e) {
			response.getOutputStream().print(
					"File Uploading Failed!" + e.getMessage());
		}

	}
}


