import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

const API_KEY = '';

@Injectable()
export class AuthService {
	
	constructor() {}

	/**
	 * Get Http headers for request that allows api-key
	 * @return {HttpHeadres} http headers
	 */
	public getHeaders() {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'API-KEY': API_KEY
		});

    	return headers;
	}
}