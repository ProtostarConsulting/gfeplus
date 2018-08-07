package com.protostar.prostudy.gf.service;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.protostar.prostudy.gf.entity.GFCourierEntity;

/**
 * Servlet implementation class DownloadCourierReport
 */
public class DownloadCourierReport extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DownloadCourierReport() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("hi i am download servlet");
		//String courierType=String.valueOf(request.getParameter("CourierType"));
		String courierType=request.getParameter("CourierType");
		
		System.out.println("Courier Type----"+courierType);
		
		GFCourierService gfCourierService = new GFCourierService();
		
		Date date=new Date();
		String DATE_FORMAT = "dd/MMM/yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
		
		List<GFCourierEntity> courierReportList = new ArrayList();
		
		OutputStream out=null;
		
		try {
			
			response.setContentType("text/csv");
			response.setHeader("Content-Disposition",
					"attachment; filename=CourierReportData_"+sdf.format(date)+".csv");
			
			ServletOutputStream outputStream = response.getOutputStream();
			OutputStreamWriter writer = new OutputStreamWriter(outputStream);
			
			writer.append("Sr. No.");
			writer.append(',');
			writer.append("Courier Name");
			writer.append(',');
			writer.append("Courier Docket ID");
			writer.append(',');
			writer.append("Courier Cost");
			writer.append(',');
			writer.append("Dispatch Notes");
			writer.append(',');
			
			writer.append(System.lineSeparator());
			
			for(int i=0;i<courierReportList.size();i++){
				
				
				writer.append(Integer.toString(i + 1));
				writer.append(',');
				String courierName = courierReportList.get(i).getCourierName();
				writer.append(courierName);
				writer.append(',');
				String courierDocketID = courierReportList.get(i).getCourierDocketID();
				writer.append(courierDocketID);
				writer.append(',');
				float courierCost = courierReportList.get(i).getCourierCost();
				writer.append(Float.toString(courierCost));
				writer.append(',');
				String courierDispatchNotes = courierReportList.get(i).getCourierDispatchNotes();
				writer.append(courierDispatchNotes);
				writer.append(',');
				
				writer.append(System.lineSeparator());
				
			}
			writer.close();
			
			
		} 
		catch (Exception e) {
			throw new ServletException("Exception in Excel Sample Servlet", e);
		}
		finally {
			if (out != null)
				out.close();
		}

	}
}
