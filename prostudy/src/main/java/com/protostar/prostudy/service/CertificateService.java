package com.protostar.prostudy.service;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.List;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.Named;
import com.googlecode.objectify.Key;
import com.protostar.prostudy.entity.CertificateEntity;

//@Api(name = "certificateService", version = "v0.1", namespace = @ApiNamespace(ownerDomain = "com.protostar.prostudy.service", ownerName = "com.protostar.prostudy.service", packagePath = ""))
public class CertificateService {

	@ApiMethod(name = "addCertificate")
	public void addCertificate(CertificateEntity item) {
		Key<CertificateEntity> now = ofy().save().entity(item).now();
	}
	
	@ApiMethod(name = "getCertificate")
	public List<CertificateEntity> getCertificate() {
		return ofy().load().type(CertificateEntity.class).list();
	}
	
	@ApiMethod(name = "getCertificateById")
	public List<CertificateEntity> getCertificateById(@Named("studID") Long studID) {
		System.out.println("inside getCertificateById");
		List<CertificateEntity> certificateList = ofy().load().type(CertificateEntity.class)
				.filter("studID", studID).list();
		return certificateList;
	}
}
