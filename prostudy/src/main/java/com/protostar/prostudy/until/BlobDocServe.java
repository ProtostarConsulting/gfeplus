package com.protostar.prostudy.until;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;

/**
 * Servlet implementation class Serve
 */
public class BlobDocServe extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public BlobDocServe() {
		super();
	}

	private BlobstoreService blobstoreService = BlobstoreServiceFactory
			.getBlobstoreService();

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		BlobKey blobKey = new BlobKey(request.getParameter("blob-key"));
		blobstoreService.serve(blobKey, response);

	}

}