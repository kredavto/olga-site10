# Фотографии врачей

Файл кладётся сюда под идентификатором врача из `lib/data.ts`:

```
public/media/doctors/kovalev.jpg
public/media/doctors/morozova.jpg
public/media/doctors/sokolov.jpg
public/media/doctors/arutyunyan.jpg
public/media/doctors/voronova.jpg
```

`Portrait` в `components/DoctorCard.tsx` проверяет наличие файла и
подставляет его сам — правок в коде не требуется. Пока файла нет,
показывается нарисованная заглушка с инициалами.

Кадр: вертикальный, 4:5, лицо в верхней трети (портрет обрезается
по `object-top`). От 1000 px по ширине.
