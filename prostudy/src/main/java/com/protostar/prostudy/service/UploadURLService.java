package com.protostar.prostudy.service;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.protostar.prostudy.until.data.ServerMsg;

@Api(name = "uploadUrlService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))

public class UploadURLService {
	
	@ApiMethod(name = "getStudentCSVUploadURL",path="getStudentCSVUploadURL")
	public ServerMsg getStudentCSVUploadURL() {
		 BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		 String createUploadUrl = blobstoreService.createUploadUrl("/StudentCSVUpload");
		 ServerMsg serverMsg = new ServerMsg();
		 serverMsg.setMsg(createUploadUrl);		 
		return serverMsg;
	}


}
