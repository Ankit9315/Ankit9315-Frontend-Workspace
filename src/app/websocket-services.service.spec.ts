import { TestBed } from '@angular/core/testing';

import { WebsocketServicesService } from './websocket-services.service';

describe('WebsocketServicesService', () => {
  let service: WebsocketServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
