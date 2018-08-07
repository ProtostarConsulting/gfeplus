package com.protostar.prostudy.until;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.google.appengine.api.NamespaceManager;

/**
 * An example App Engine namespace setting filter.
 * 
 * <p>
 * This namespace filter provides for a number of strategies as an example but
 * is also careful not to override the namespace where it has previously been
 * set, for example, incoming task queue requests.
 */
public class NamespaceFilter implements Filter {

	// The filter config.
	private FilterConfig filterConfig;

	/*
	 * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
	 */
	@Override
	public void init(FilterConfig config) throws ServletException {
		this.filterConfig = config;
	}

	/*
	 * @see javax.servlet.Filter#destroy()
	 */
	@Override
	public void destroy() {
		this.filterConfig = null;
	}

	/*
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest,
	 * javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {

		// If the NamespaceManager state is already set up from the
		// context of the task creator the current namespace will not
		// be null. It's important to check that the current namespace
		// has not been set before setting it for this request.

		String url = ((HttpServletRequest) request).getRequestURL().toString();
		System.out.println("Url: " + url);

		String subDomainNameSpace = this.getSubDomain(url);
		System.out.println("subDomainNameSpace: " + subDomainNameSpace);

		NamespaceManager.set(subDomainNameSpace);

		// chain into the next request
		chain.doFilter(request, response);
	}

	public static String getSubDomain(String url) {
		if (url.indexOf(".") > 0) {
			String url2 = url.substring(url.indexOf("://")+3, url.length());
			int firstIndex = url2.indexOf("/");
			String nsRaw = url2.substring(0, firstIndex);
			String ns = nsRaw.replaceAll(":", "");
			return ns;
		}

		return null;
	}

}
