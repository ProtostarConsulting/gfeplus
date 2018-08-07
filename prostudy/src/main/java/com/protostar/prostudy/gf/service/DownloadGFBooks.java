package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.protostar.prostudy.gf.entity.GFBookEntity;

/**
 * Servlets implementation class DownloadGFBooks
 */
public class DownloadGFBooks extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final Logger log = Logger.getLogger(UplodePartnerSchoolsExcel.class
			.getName());

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DownloadGFBooks() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		log.info("hi i am download servlet");
		if (request.getRemoteHost().contains("localhost")
				|| request.getRemoteHost().contains("127.0.0.1")) {
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.addHeader("Access-Control-Allow-Methods",
					"GET,PUT,POST,DELETE");
			response.addHeader("Access-Control-Allow-Headers", "Content-Type");
		}
		
		Long insId = Long.parseLong(request.getParameter("InstituteId"));

		log.info("insid===" + insId);

		GFBookStockService gfBookStockService = new GFBookStockService();

		Date date = new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);

		List<GFBookEntity> gfbookEntity = gfBookStockService
				.getGFBookByInstituteId(insId);

		OutputStream out = null;
		try {

			response.setContentType("text/csv");

			response.setHeader("Content-Disposition",
					"attachment; filename=GFBookData_" + sdf.format(date)
							+ ".csv");

			ServletOutputStream outputStream = response.getOutputStream();
			OutputStreamWriter writer = new OutputStreamWriter(outputStream);

			writer.append("standard");
			writer.append(',');
			writer.append("bookName");
			writer.append(',');
			writer.append("bookAuther");
			writer.append(',');
			writer.append("weight");
			writer.append(',');
			writer.append("bookPrice");
			writer.append(',');
			writer.append("bookPublication");
			writer.append(',');
			writer.append("bookMedium");
			writer.append(',');
			writer.append("bookQty");
			writer.append(',');
			/*
			 * writer.append("Temp"); writer.append(',');
			 */writer.append(System.lineSeparator());

			for (int i = 0; i < gfbookEntity.size(); i++) {

				try {

					String qty = String.valueOf(gfbookEntity.get(i)
							.getBookQty());
					String weight = String.valueOf(gfbookEntity.get(i)
							.getWeight());
					String price = String.valueOf(gfbookEntity.get(i)
							.getBookPrice());

					writer.append(gfbookEntity.get(i).getStandard());
					writer.append(',');

					writer.append(gfbookEntity.get(i).getBookName());
					writer.append(',');
					writer.append(gfbookEntity.get(i).getBookAuther());
					writer.append(',');
					writer.append(weight.trim());
					writer.append(',');
					writer.append(price.trim());
					writer.append(',');
					writer.append(gfbookEntity.get(i).getBookPublication());
					writer.append(',');
					writer.append(gfbookEntity.get(i).getBookMedium());
					writer.append(',');
					writer.append(qty.trim());
					writer.append(',');
					/*
					 * writer.append("Temp"); writer.append(" ");
					 */writer.append(System.lineSeparator());
				} catch (Exception e) {
					log.warning(e.getMessage());
					e.printStackTrace();
				}
			}

			writer.close();

		} catch (Exception e) {
			log.severe(e.getMessage());
			e.printStackTrace();
			throw new ServletException(
					"Error Occurred while downloading the csv file.", e);
		} finally {
			if (out != null)
				out.close();
		}

	}

}