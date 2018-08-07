package com.protostar.prostudy.gf.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.io.IOException;
import java.io.InputStream;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.protostar.prostudy.entity.UserEntity;
import com.protostar.prostudy.gf.entity.PartnerSchoolEntity;
import com.protostar.prostudy.until.data.UtilityService;

public class UploadPartnerSchoolUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final Logger log = Logger.getLogger(UploadBulkBookServlet.class
			.getName());

	public UploadPartnerSchoolUser() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			if (request.getHeader("Content-Type") != null
					&& request.getHeader("Content-Type").startsWith(
							"multipart/form-data")) {
				ServletFileUpload upload = new ServletFileUpload();
				FileItemIterator iterator = upload.getItemIterator(request);
				String[] split2 = null;
				Long insId = 0L;
				Long partnerSchoolID = 0L;

				while (iterator.hasNext()) {
					FileItemStream item = iterator.next();
					System.out.println("item.getFieldName(): "
							+ item.getFieldName());

					if (item.getName() == null) {

						if ("instituteId".equalsIgnoreCase(item.getFieldName())) {
							insId = Long.parseLong(UtilityService.read(item
									.openStream()));
						}
						if ("partnerSchoolID".equalsIgnoreCase(item
								.getFieldName())) {

							partnerSchoolID = Long.parseLong(UtilityService
									.read(item.openStream()));
						}
						continue;
					}
					InputStream openStream = item.openStream();
					int len = 0;
					byte[] fileContent = new byte[2000000];

					int read = openStream.read(fileContent);

					while ((len = openStream.read(fileContent, 0,
							fileContent.length)) != -1) {
						// res.getOutputStream().write(fileContent, 0, len);
					}
					openStream.close();
					log.info("File Read is Done!!");

					String fileAsString = new String(fileContent);

					split2 = fileAsString.split("\n");
				}
				System.out
						.println("No of records to process: " + split2.length);

				for (int row = 1; row < split2.length; row++) {

					try {
						String[] split = split2[row].split(",");
						if (split == null || split.length < 5) {
							continue;
						}

						UserEntity userEntity = new UserEntity();
						PartnerSchoolEntity pSchool = new PartnerSchoolEntity();
						PartnerSchoolService pSchoolService = new PartnerSchoolService();
						pSchool = pSchoolService
								.getPSchoolByPSID(partnerSchoolID);

						userEntity.setFirstName(split[0].trim());
						userEntity.setLastName(split[1].trim());
						userEntity.setEmail_id(split[2].trim());
						userEntity.setPassword(split[3].trim());
						userEntity.setRole(split[4].trim());
						userEntity.setInstituteID(insId);
						userEntity.setSchool(pSchool);

						ofy().save().entity(userEntity).now();
					} catch (Exception e) {
						log.warning(e.getMessage());
						e.printStackTrace();
					}
				}

			}
		} catch (Exception e) {
			log.severe(e.getMessage());
			e.printStackTrace();
			throw new ServletException(
					"Error Occurred while uploading the csv file.", e);
		}
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		log.info("In suide UploadPartnerSchoolUser....");
		this.doGet(request, response);
	}

}
