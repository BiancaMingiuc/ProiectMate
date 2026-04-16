import pandas as pd
import matplotlib.pyplot as plt
from supabase import create_client, Client

URL = "https://enfqqsajxexyqesqsyne.supabase.co";  

KEY = "sb_publishable_8f72yEWJ4IhgqsMYwOLKZA_GDHHpQI6"; 
supabase: Client = create_client(URL, KEY)

def analizeaza_date_mate():
    response = supabase.table("rezultate_mate").select("*").execute()
    df = pd.DataFrame(response.data)

    if df.empty:
        print("Tabelul este gol!")
        return

    df['created_at'] = pd.to_datetime(df['created_at'])
    
    per_elev = df.groupby('nume_elev')[['scor_corecte', 'scor_gresite']].sum()
    
    per_elev.plot(kind='bar', figsize=(10, 5), color=['#4CAF50', '#F44336'])
    plt.title('Total Răspunsuri Corecte vs Greșite per Elev')
    plt.ylabel('Număr Răspunsuri')
    plt.xticks(rotation=0)
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    plt.tight_layout()
    plt.show()

    nume = 'Luca'
    df_elev = df[df['nume_elev'] == nume].sort_values('created_at')
    
    if not df_elev.empty:
        plt.figure(figsize=(12, 5))
        plt.plot(df_elev['created_at'], df_elev['scor_corecte'], 
                 marker='o', label='Corecte', color='green')
        plt.fill_between(df_elev['created_at'], df_elev['scor_corecte'], color='green', alpha=0.1)
        
        plt.title(f'Progresul elevului {nume} în timp')
        plt.xlabel('Data și Ora')
        plt.ylabel('Scor Corecte')
        plt.legend()
        plt.grid(True)
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()
    else:
        print("Nu există suficiente date.")

if __name__ == "__main__":
    analizeaza_date_mate()