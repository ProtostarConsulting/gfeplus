package com.protostar.prostudy.proadmin.services;

import java.util.logging.Logger;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.protostar.prostudy.until.data.ServerMsg;

@Api(name = "uploadPathService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.proadmin.services", ownerName = "com.protostar.prostudy.proadmin.services", packagePath = ""))
public class UploadURLService {

	private static final Logger log = Logger.getLogger(UploadURLService.class
			.getName());

	@ApiMethod(name = "getLogUploadURL", path="getLogUploadURL")
	public ServerMsg getLogUploadURL() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/UploadLogoServlet");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}
	
	@ApiMethod(name = "getPartnerSchoolsUploadURL", path="getPartnerSchoolsUploadURL")
	public ServerMsg getPartnerSchoolsUploadURL() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/UplodePartnerSchoolsExcel");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}
	
	
	@ApiMethod(name = "getPartnerSchoolsUploadURLForDownload", path="getPartnerSchoolsUploadURLForDownload")
	public ServerMsg getPartnerSchoolsUploadURLForDownload() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/DownloadPartnerSchools");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}

	@ApiMethod(name = "getBulkBookUploadURL", path="getBulkBookUploadURL")
	public ServerMsg getBulkBookUploadURL() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/UploadBulkBookServlet");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}
	
	@ApiMethod(name = "getBulkGFStudentUploadURL", path="getBulkGFStudentUploadURL")
	public ServerMsg getBulkGFStudentUploadURL() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/UploadBulkGFStudentServlet");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}
	
	@ApiMethod(name = "getGFStudentsURLForDownload", path="getGFStudentsURLForDownload")
	public ServerMsg getGFStudentsURLForDownload() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/DownloadGFStudents");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}
	
	@ApiMethod(name = "getGFBooksURLForDownload", path="getGFBooksURLForDownload")
	public ServerMsg getGFBooksURLForDownload() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/DownloadGFBooks");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}
	
	@ApiMethod(name = "getScheduledQuestionsUploadURL", path = "getScheduledQuestionsUploadURL")
	public ServerMsg getScheduledQuestionsUploadURL() {
		BlobstoreService blobstoreService = BlobstoreServiceFactory
				.getBlobstoreService();
		String createUploadUrl = blobstoreService
				.createUploadUrl("/UploadScheduledQuestionListServlet");
		ServerMsg serverMsg = new ServerMsg();
		serverMsg.setMsg(createUploadUrl);
		return serverMsg;
	}
	@ApiMethod(name = "getBookPDFUrl", path="getBookPDFUrl")
	public ServerMsg getBookPDFUrl() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/UploadBookPDFServlet");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}
	
}// end of uploadUrlService
