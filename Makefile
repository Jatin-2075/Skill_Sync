.PHONY: backend frontend install-backend install-frontend dev clean

install-backend:
	cd backend && python -m venv venv && . venv/bin/activate && pip install -r requirements.txt

install-frontend:
	cd frontend && npm install

install: install-backend install-frontend

backend:
	cd backend && . venv/bin/activate && uvicorn main:app --reload --port 8000

frontend:
	cd frontend && npm run dev

dev:
	@echo "Run 'make backend' and 'make frontend' in separate terminals"
	@echo "Or use: docker-compose up"

clean:
	find backend -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
	find backend -name "*.pyc" -delete 2>/dev/null || true
	rm -f backend/skillsync.db
